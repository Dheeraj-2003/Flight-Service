import { IsNotEmpty, IsNumber, IsString, Length, Min } from "@nestjs/class-validator";
import { IsInt, IsOptional, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

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

export class UpdateAirportDto{

    @IsString()
    @IsOptional()
    name:string;

    @IsString()
    @IsOptional()
    code:string;

    @IsString()
    @IsOptional()
    address:string;

    @IsInt()
    @IsOptional()
    cityId:number;

    @Validate(AtLeastOneField)
    _atLeastOne?: any;
}