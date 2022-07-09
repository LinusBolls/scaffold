import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}



public class DbUser {
    private String email;
    private boolean emailConfirmed;
    private String passwordHash;
    private String profileId;
    @Id
    private String id;
}
