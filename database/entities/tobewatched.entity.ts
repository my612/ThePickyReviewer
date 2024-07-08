import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, Unique, JoinColumn } from "typeorm";
import { Films } from "./films.entity";
import { User } from "./user.entity";

@Entity()
@Unique(["userId", "filmId"])
export class ToBeWatched {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() // Explicit column for filmId
    filmId: number;

    @Column() // Explicit column for userId
    userId: number;

    @ManyToOne(() => Films, film => film.id)
    @JoinColumn({ name: "filmId" }) // This links the filmId column to the film relation
    film: Films;
    
    @ManyToOne(() => User, user => user.username)
    @JoinColumn({ name: "userId" }) // This links the userId column to the user relation
    user: User;

    @Column()
    date_created: Date;
}