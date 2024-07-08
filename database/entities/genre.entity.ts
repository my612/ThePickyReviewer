import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Films } from "./films.entity";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Films, film => film.id)
    @JoinColumn({name: "filmId"})
    film: Films;

    @Column()
    genre: string;

    @Column()
    date_created: Date;

}