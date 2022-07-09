import {
  ObjectType,
  Field,
  InputType,
  ArgsType,
  Resolver,
  ID,
  Mutation,
  Arg,
  Query,
} from "type-graphql";

import userController from "../controllers/user.controller";

@ObjectType()
class User {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  email: string;
}

@InputType()
class NewUserInput {
  @Field()
  // @MaxLength(30)
  email: string;

  @Field({ nullable: true })
  // @Length(30, 255)
  name?: string;

  @Field()
  password: string;
}

// @ArgsType()
// class RecipesArgs {
//   @Field((type) => Int)
//   @Min(0)
//   skip: number = 0;

//   @Field((type) => Int)
//   @Min(1)
//   @Max(50)
//   take: number = 25;
// }

@Resolver(User)
class UserResolver {
  @Query((returns) => User)
  async user(@Arg("id") id: string) {
    return userController.get(id);
  }

  // @Query((returns) => [Recipe])
  // recipes(@Args() { skip, take }: RecipesArgs) {
  //   return this.recipeService.findAll({ skip, take });
  // }

  @Mutation((returns) => User)
  // @Authorized()
  addUser(
    @Arg("userData") userData: NewUserInput
    // @Ctx("user") user: User
  ) {
    return userController.create(userData);
  }

  // @Mutation((returns) => Boolean)
  // @Authorized(Roles.Admin)
  // async removeRecipe(@Arg("id") id: string) {
  //   try {
  //     await this.recipeService.removeById(id);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }
}
export default UserResolver;
