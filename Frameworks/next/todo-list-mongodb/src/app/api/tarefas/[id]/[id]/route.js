import Tarefa from "@/models/Tarefa";
import connectMongo from "@/services/mongpodb";
import { NextResponse } from "next/server";

// Atualizar tarefa (PUT)
export async function PUT(req, { params }) {
  try {
    await connectMongo();
    const data = await req.json();
    const tarefa = await Tarefa.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!tarefa) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(tarefa, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao Atualizar a Tarefa" },
      { status: 500 }
    );
  }
}

// Deletar tarefa (DELETE)
export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const tarefa = await Tarefa.findByIdAndDelete(params.id);
    if (!tarefa) {
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(tarefa, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar a Tarefa" },
      { status: 500 }
    );
  }
}