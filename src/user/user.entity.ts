import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt'
@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ unique: true })
    email: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password,bcrypt.genSaltSync())
    }
}