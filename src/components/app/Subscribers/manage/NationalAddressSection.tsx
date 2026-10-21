import { FormSection } from "@/components/app/shared/forms/AppForm";
import { FormInput } from "@/components/app/shared/forms/FormInput";
import { useDict } from "@/hooks/useDict";

export type NationalAddressValues = {
  nationalBuildingNumber?: string | null;
  nationalStreet?: string | null;
  nationalDistrict?: string | null;
  nationalCity?: string | null;
  nationalPostalCode?: string | null;
  nationalAdditionalNumber?: string | null;
};

type Field = keyof NationalAddressValues;

const onlyDigits = (value: string, maxLength: number) => value.replace(/\D/g, "").slice(0, maxLength);

/**
 * The subscriber's Saudi national address (buyer address on ZATCA tax invoices).
 * Editable in the add/edit forms; read-only on the subscriber detail page.
 */
export const NationalAddressSection = ({
  title,
  values,
  onChange,
  errors = {},
  readOnly = false,
}: {
  title: string;
  values: NationalAddressValues;
  onChange?: (field: Field, value: string) => void;
  errors?: { [key: string]: string };
  readOnly?: boolean;
}) => {
  const dict = useDict();
  const labels = dict.add_new_subscriber_form.labels;
  const placeholders = dict.add_new_subscriber_form.placeholders;

  const fields: { field: Field; label: string; placeholder: string; digits?: number }[] = [
    { field: "nationalBuildingNumber", label: labels.national_building_number, placeholder: placeholders.national_building_number, digits: 4 },
    { field: "nationalStreet", label: labels.national_street, placeholder: placeholders.national_street },
    { field: "nationalDistrict", label: labels.national_district, placeholder: placeholders.national_district },
    { field: "nationalCity", label: labels.national_city, placeholder: placeholders.national_city },
    { field: "nationalPostalCode", label: labels.national_postal_code, placeholder: placeholders.national_postal_code, digits: 5 },
    {
      field: "nationalAdditionalNumber",
      label: labels.national_additional_number,
      placeholder: placeholders.national_additional_number,
      digits: 4,
    },
  ];

  return (
    <FormSection title={title}>
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        {fields.map(({ field, label, placeholder, digits }) => (
          <FormInput
            key={field}
            label={label}
            placeholder={placeholder}
            value={values[field] ?? ""}
            onChange={(value: string): void => {
              onChange?.(field, digits ? onlyDigits(value, digits) : value);
            }}
            errorMessage={errors[field]}
            isOptional={!readOnly}
            readOnly={readOnly}
          />
        ))}
      </div>
    </FormSection>
  );
};
