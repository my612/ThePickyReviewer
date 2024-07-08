import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";   
import { Reviews } from "./reviews.entity";

@Entity()
export class Films {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    year: number; 

    @Column()
    description: string;

    @OneToMany(() => Reviews, review => review.film)
    reviews: Reviews[];

    @Column()
    date_created: Date;
    
}