import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique, JoinColumn } from "typeorm";   
import { Films } from "./films.entity";
import { User } from "./user.entity";

@Entity()
@Unique(["userId", "filmId"])
export class Reviews {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userId: string; // Explicit column for userId

    @Column()
    filmId: string; // Explicit column for filmId

    @ManyToOne(() => Films, film => film.id)
    @JoinColumn({name: "filmId"})
    film: Films;
    
    @ManyToOne(() => User, user => user.username)
    @JoinColumn({name: "userId"})
    user: User;

    @Column()
    name: string;

    @Column()
    comment: string;

    @Column()
    rating: number;

    @Column()
    date_created: Date;
}