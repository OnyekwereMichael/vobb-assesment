import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useCreateDeal, useGetProduct, useGetStage } from "@/lib/query";
import { useGetClient } from "../lib/query";
import { ICreateDeals } from "@/lib/types";
import { useTheme } from "@/components/theme/ThemeProvider";

// Types
interface Client {
  id: string;
  name: string;
}

interface DealFormValues {
  clientId: string;
  productId: string;
  stage: string;
}

// Validation schema
const dealSchema = Yup.object({
  clientId: Yup.string().required("Client is required"),
  productId: Yup.string().required("Product is required"),
  stage: Yup.string().required("Stage is required"),
});

const CreateDeal: React.FC = () => {
  const { theme } = useTheme();

  const { data: products, isLoading: productsLoading } = useGetProduct();
  const { data: clients, isLoading: clientsLoading } = useGetClient();
  const { data: stages, isLoading: stageLoading } = useGetStage();

  const createDealMutation = useCreateDeal();

  const initialValues: DealFormValues = {
    clientId: "",
    productId: "",
    stage: "Lead Generated",
  };

  const handleSubmit = (values: DealFormValues, { setSubmitting, resetForm }: any) => {
    createDealMutation.mutate(
      { clientId: values.clientId, productId: values.productId, stage: values.stage } as ICreateDeals,
      {
        onSuccess: () => {
          toast.success("Deal created successfully!");
          resetForm();
        },
        onError: () => toast.error("Failed to create deal"),
      }
    );
    setSubmitting(false);
  };

  if (clientsLoading || productsLoading || stageLoading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen px-4 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <p className={`${theme === "dark" ? "text-gray-200" : "text-gray-500"}`}>
          Loading clients & products...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex justify-center items-center min-h-screen px-4 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-xl shadow-lg p-6 sm:p-8 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Create New Deal
        </h2>

        <Formik initialValues={initialValues} validationSchema={dealSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-5 sm:space-y-6">
              {/* Client */}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Client
                </label>
                <Field
                  as="select"
                  name="clientId"
                  className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:border-blue-500 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                >
                  <option value="">Select client</option>
                  {clients.map((c: Client) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="clientId"
                  component="p"
                  className="text-xs sm:text-sm text-red-500 mt-1"
                />
              </div>

              {/* Product */}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Product
                </label>
                <Field
                  as="select"
                  name="productId"
                  className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:border-blue-500 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                >
                  <option value="">Select product</option>
                  {products?.map((p: { id: number; name: string }) => (
                    <option key={p.id} value={p.id.toString()}>
                      {p.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="productId"
                  component="p"
                  className="text-xs sm:text-sm text-red-500 mt-1"
                />
              </div>

              {/* Stage */}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Stage
                </label>
                <Field
                  as="select"
                  name="stage"
                  className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:border-blue-500 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                >
                  {stages.map((s: { id: string | number; name: string }) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="stage"
                  component="p"
                  className="text-xs sm:text-sm text-red-500 mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow transition-colors ${
                  isSubmitting
                    ? "bg-blue-400 text-white cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {createDealMutation.isPending ? "Creating..." : "Create Deal"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateDeal;
