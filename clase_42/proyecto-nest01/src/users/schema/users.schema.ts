import { HydratedDocument, Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

enum roles {
    SUPERUSER = 'superuser',
    ADMIN = 'admin',
    USER = 'user'
}

// Revisar los comentarios sobre HydratedDocument vs Document en la doc oficial de Mongoose
// https://mongoosejs.com/docs/typescript.html
export type UsersDocument = HydratedDocument<User>
// export type UsersDocument = Document<User>


// Generamos y exportamos un esquema para la colección users, al estilo Nest
// con el uso de decoradores y clases
@Schema({ collection: 'users' })
export class User {
    @Prop({ required: true })
    first_name: string

    @Prop({ required: true })
    last_name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop()
    avatar: string

    @Prop({ default: roles.USER })
    role: roles
}

export const UserSchema = SchemaFactory.createForClass(User)