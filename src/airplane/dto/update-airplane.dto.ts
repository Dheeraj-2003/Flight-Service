import { IsNotEmpty, IsNumber, IsString, Length, Min } from "@nestjs/class-validator";
import { IsOptional, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'AtLeastOneField', async: false })
export class AtLeastOneField implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as Record<string, any>;
    return Object.values(object).some((value) => value !== undefined);
  }

  defaultMessage(_: ValidationArguments) {
    return 'At least one field must be provided for update';
  }
}

export class UpdateAirplaneDto{
    @IsString()
    @IsOptional()
    @Length(1,20)
    modelNumber:string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    capacity: number;

    @Validate(AtLeastOneField)
    _atLeastOne?: any;
}