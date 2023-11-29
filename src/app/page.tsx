import CardCEP from "@/components/card-cep";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <main
      className={`flex flex-col min-h-screen bg-slate-200 dark:bg-slate-800 transition-colors duration-500`}
    >
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <CardCEP />
      </div>
      <Footer />
    </main>
  );
}
