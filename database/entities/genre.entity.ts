import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Films } from "./films.entity";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;
    @Column() // Explicit column for filmId
    filmId: number;
    
    @ManyToOne(() => Films, film => film.id)
    @JoinColumn({name: "filmId"})
    film: Films;

    @Column()
    genre: string;

    @CreateDateColumn()
    date_created: Date;

}