import {
  type DefaultValues,
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
  type UseFormReturn,
} from 'react-hook-form';
import type { ReactNode } from 'react';
import {
  FormCard,
  FormCardSubtitle,
  FormCardTitle,
  FormHeaderArea,
  FormMainContent,
} from './Form.styles';

interface FormProps<T extends FieldValues> {
  children: (methods: UseFormReturn<T>) => ReactNode;
  onSubmit: SubmitHandler<T>;
  title?: string;
  subtitle?: string;
  defaultValues?: DefaultValues<T>;
  logo?: ReactNode;
  maxWidth?: number;
}

export default function Form<T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  title,
  subtitle,
  logo,
  maxWidth,
}: FormProps<T>) {
  const methods = useForm<T>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <FormCard style={maxWidth ? { maxWidth } : undefined}>
        {(title || subtitle || logo) && (
          <FormHeaderArea>
            {logo ?? null}
            {title && <FormCardTitle>{title}</FormCardTitle>}
            {subtitle && <FormCardSubtitle>{subtitle}</FormCardSubtitle>}
          </FormHeaderArea>
        )}
        <FormMainContent onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          {children(methods)}
        </FormMainContent>
      </FormCard>
    </FormProvider>
  );
}
