/*import { Property, Required, Format, MinLength } from '@tsed/schema';
import { Model, ObjectID } from '@tsed/mongoose';

@Model()
export class User {
  @ObjectID('id')
  _id: string;

  @Property()
  @Required()
  firstName: string;

  @Property()
  @Required()
  lastName: string;

  @Property()
  @Required()
  @Format('email')
  email: string;

  @Property()
  @Required()
  @MinLength(6)
  password: string;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();
}
*/
