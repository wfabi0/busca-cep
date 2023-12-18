"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { States } from "@/utils/states";
import { toast } from "./ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const formSchema = z.object({
  cep: z
    .string()
    .refine((cep) => cep.toString().replace("-", "").length === 8, {
      message: "O CEP deve conter 8 dígitos.",
    }),
});

async function getCep(str: string) {
  const API_URL = "https://brasilapi.com.br/api";
  const resp = await fetch(API_URL + "/cep/v1/" + str.replace("-", ""), {
    method: "GET",
  });
  return await resp.json();
}

export default function CardCEP() {
  const [dialog, setDialog] = useState(false);
  const [cep, setCep] = useState<any>({});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cep: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setDialog(true);
    const resp = await getCep(data.cep);
    setCep({ data: resp });
  };

  const handleCopy = () => {
    let arr: string[] = [];
    if (cep?.data?.state) arr.push(cep?.data?.state);
    if (cep?.data?.city) arr.push(cep?.data?.city);
    if (cep?.data?.neighborhood) arr.push(cep?.data?.neighborhood);
    if (cep?.data?.street) arr.push(cep?.data?.street);
    if (arr.length > 0) {
      let textoParaCopiar = States[arr[0]];
      if (arr.length > 1) textoParaCopiar += ", " + arr.slice(1).join(", ");
      navigator.clipboard.writeText(textoParaCopiar);
      return toast({
        title: "Endereço copiado com sucesso.",
        description: textoParaCopiar,
        variant: "success",
      });
    }
  };

  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Busca CEP</CardTitle>
        <CardDescription>
          Busque por um CEP e veja o endereço completo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-4"
          >
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Digite um CEP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000-000"
                      {...field}
                      autoComplete="off"
                      inputMode="numeric"
                      onChange={(e) => {
                        const formattedValue = e.target.value.replace(
                          /\D/g,
                          ""
                        );
                        if (formattedValue.length <= 8) {
                          if (formattedValue.length <= 5) {
                            field.onChange(formattedValue);
                          } else {
                            field.onChange(
                              formattedValue.slice(0, 5) +
                                "-" +
                                formattedValue.slice(5)
                            );
                          }
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Dialog
              open={dialog}
              onOpenChange={(e) => {
                setDialog(false);
                setCep({});
              }}
            >
              <DialogTrigger asChild>
                <Button type="submit">Procurar</Button>
              </DialogTrigger>
              {
                <DialogContent>
                  {cep?.data?.message ? (
                    <DialogHeader>
                      <DialogTitle>CEP não encontrado</DialogTitle>
                      <DialogDescription>
                        Você não inseriu um CEP válido.
                      </DialogDescription>
                    </DialogHeader>
                  ) : cep?.data ? (
                    <>
                      <DialogHeader>
                        <DialogTitle>
                          CEP Encontrado
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  type="submit"
                                  size="sm"
                                  className="p-3 mx-2"
                                  onClick={handleCopy}
                                  // title="Copiar endereço"
                                >
                                  <span className="sr-only">Copy</span>
                                  <IoCopyOutline className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copiar endereço.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </DialogTitle>
                        <DialogDescription>
                          Endereço encontrado:
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 sm:grid-cols-1 items-center gap-4">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="state">Estado</Label>
                          <Input
                            id="state"
                            defaultValue={
                              `${States[cep?.data?.state]} (${
                                cep?.data?.state
                              })` ?? "Não especificado"
                            }
                            readOnly
                            className="w-min"
                          />
                        </div>
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            defaultValue={cep?.data?.city ?? "Não especificado"}
                            readOnly
                            className="w-min"
                          />
                        </div>
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="neighborhood">Bairro</Label>
                          <Input
                            id="neighborhood"
                            defaultValue={
                              cep?.data?.neighborhood ?? "Não especificado"
                            }
                            readOnly
                            className="w-min"
                          />
                        </div>
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="street">Rua</Label>
                          <Input
                            id="street"
                            defaultValue={
                              cep?.data?.street ?? "Não especificado"
                            }
                            readOnly
                            className="w-min"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full border-t-4 border-slate-600 border-solid h-20 w-20"></div>
                    </div>
                  )}
                </DialogContent>
              }
            </Dialog>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
