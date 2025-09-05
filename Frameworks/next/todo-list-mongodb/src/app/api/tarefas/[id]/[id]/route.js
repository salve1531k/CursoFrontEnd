//PUT e DELETE

import connectMongo from "@/services/mongpodb";

export async function PUT(req, {params}){ //pegar o ID dos parametros
    try {
        await connectMongo();
        const data = await req.json();
        const tarefa =  await Tarefa.findByIdAndUpdate(
            params.id, //pegar o id dos parametros
            data, //dados que serão atualizados
            {new: true, runValidators: true} //retorna a tarefa atualizada

        );
        if(!tarefa){
            return NextResponse.json(
                {error: "Tarefa não encontrada"},
                {status:404}
            );
        }
    } catch (error) {
        return NextResponse.json(
            {error: "Erro ao Atualizar a Tarefa"},
            {status:500}
        );
    }
}

//DELETE