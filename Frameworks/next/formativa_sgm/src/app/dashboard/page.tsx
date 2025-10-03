"use-client";

import DashBoardTecnico from "@/app/componentes/DashboardTecnico";
import DashboardAdmin from "@/app/componentes/DashboardAdmin";
import DashboardGerente from "@/app/componentes/DashboardGerente";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardPage(){
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(()=>{
        const role = localStorage.getItem("userRole");
        if(!role) {
            router.push("/login");//redireciona para o login caso perca a userRole
        }else{
            setUserRole(role);
        }
    });

    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        router.push("/login");
    };

    const renderDashboard = () => {
        if( userRole?.toLowerCase() === "admin"){
            return <DashboardAdmin />;
        } else if (userRole === "gerente"){
            return <DashboardGerente />;
        } else if (userRole === "tecnico"){
            return <DashBoardTecnico/>;
        }
    };

    return (
        <div>
            <header>
                <h1>Bem-Vindo</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <main>
                {renderDashboard()}
            </main>
        </div>
    );
}
