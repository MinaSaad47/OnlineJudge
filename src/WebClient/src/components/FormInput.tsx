import {Control, Controller, FieldValues, Path,} from "react-hook-form";
import {Input, InputProps} from "@nextui-org/react";

type FormInputProps<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
} & InputProps

const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
    const {name, control, ...rest} = props
    return (
        <Controller render={({
                                 field, fieldState: {
                error
            }
                             }) => <Input {...rest} {...field} errorMessage={error?.message} isInvalid={!!error}/>}
                    control={control} name={name}/>
    );
};

export default FormInput;