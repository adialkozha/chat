import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt'
@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password,10);
    }
}