import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import {  useCreateDeal, useGetProduct, useGetStage } from "@/lib/query";
import { useGetClient } from "../lib/query";
import { ICreateDeals } from "@/lib/types";

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

// const stages = [
//   "Lead Generated",
//   "Contacted",
//   "Application Submitted",
//   "Application Under Review",
//   "Deal Finalized",
//   "Payment Confirmed",
//   "Completed",
//   "Lost",
// ];

// Validation schema with Yup
const dealSchema = Yup.object({
  clientId: Yup.string().required("Client is required"),
  productId: Yup.string().required("Product is required"),
  stage: Yup.string().required("Stage is required"),
});

const CreateDeal: React.FC = () => {
  const [loadingClients, setLoadingClients] = useState(true);

  const { data: products, isLoading: productsLoading, isError: productsError } = useGetProduct();

  const { data: clients, isLoading: clientsLoading, isError: clientsError } = useGetClient();

  const { data: stages, isLoading: stageLoading, isError: stageError } = useGetStage();


  const createDealMutation = useCreateDeal();

  const initialValues: DealFormValues = {
    clientId: "",
    productId: "",
    stage: "Lead Generated",
  };

  const handleSubmit = (values: DealFormValues, { setSubmitting, resetForm }: any) => {
  createDealMutation.mutate({
  clientId: values.clientId,
  productId: values.productId,
   stage: values.stage,
   
  // Optional fields can be omitted
} as ICreateDeals);
    setSubmitting(false);
    resetForm();
  };


  // Loading state
  if (clientsLoading || productsLoading || stageLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500">Loading clients & products...</p>
      </div>
    );
  }

  console.log('the product', products?.map((item) => item.name));
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Deal</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={dealSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <Field
                  as="select"
                  name="clientId"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select client</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="clientId"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Product */}
              {/* Product */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
 <Field as="select" name="productId" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
  <option value="">Select product</option>
  {products?.map((p: { id: number; name: string }) => (
    <option key={p.id} value={p.id.toString()}>
      {p.name}
    </option>
  ))}
</Field>
<ErrorMessage name="productId" component="p" className="text-sm text-red-500 mt-1" />

  <ErrorMessage
    name="productId"
    component="p"
    className="text-sm text-red-500 mt-1"
  />
</div>


              {/* Stage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                <Field
                  as="select"
                  name="stage"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {stages.map((s) => (
                    <option key={s.id}  value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="stage"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create Deal"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateDeal;
