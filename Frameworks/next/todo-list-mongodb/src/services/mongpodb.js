//auxiliar de conexão com o mongo db
import mongoose from 'mongoose';

//arrow Function

const connectMongo = () =>{
    mongoose.connect(process.env.DATABASE_URL)//estabelece a conexão com o banco
    .then(() => console.log('Conectado ao MongoDB'))//se conectar com sucesso
    .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));//se der erro
}

export default connectMongo;