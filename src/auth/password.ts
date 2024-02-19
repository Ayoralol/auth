import * as bcrypt from 'bcrypt';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const generateHash = async (password: string): Promise<string> => {
  const saltRounds = 12;

  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

export const validateHash = async (incoming: string, hash: string) => {
  return await bcrypt.compare(incoming, hash);
};

export const IsEqualTo =
  (property: string, validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
      },
    });
  };
