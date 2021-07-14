import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt'
import { MessageEntity } from '@app/message/message.entity';
@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    avatar: string;

    @Column({default:'user'})
    role: string;

    @Column({default: 'on'})
    status: string;

    @Column({default: ''})
    tag: string;
    
    @Column({type: 'double',default: new Date().valueOf()})
    createTime:number;
    
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password,10);
    }


    @OneToMany(()=>MessageEntity,(message)=>message.author)
    messages: MessageEntity[]
}