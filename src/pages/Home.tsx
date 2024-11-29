import CompanyPage from "@/components/CompanyPage";
import { NavigationMenuDesktop } from "@/components/NavigationMenuDesktop";

export default function Home(): JSX.Element{
    return (
        <div className="w-full">
        <div className="flex mt-4 w-full justify-center">
            <NavigationMenuDesktop/>
        </div>
        <main className="flex p-6 w-full flex-col items-center">
            <div className='max-w-[1216px] mt-12 w-full'>
                <div className="flex w-full justify-between">
                    <h1 className="text-3xl text-sky-950 self-start font-semibold mb-6">Suas Empresas</h1>
                </div>
                    <CompanyPage/>
            </div>
        </main>
        </div>
    )}