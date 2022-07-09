import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: string

  @Column()
  userId: string

  @Column()
  gender: string

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string

  @Column()
  dateOfBirth: Date

  @Column()
  description: string

  @OneToMany(type => ) @JoinColumn()
  dietaryPreferences: string

  @Column()
  interests: string

  @Column()
  spokenLanguages: string

  @Column()
  profilePictureId: string

  @Column()
  pictureIds: string

}



public class DbProfile {
  private ProfileFlatSearchParams flatSearchParams;
  private Gender gender;
  private ProfileType profileType;
  private List<ProfileSearching> searching;
}