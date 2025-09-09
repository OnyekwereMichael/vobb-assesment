import { useParams, useNavigate } from "react-router-dom";
import {
  useGetDealByDealId,
  useGetStage,
  useUpdateDeal,
  useGetClient,
  useGetProduct,
} from "@/lib/query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ErrorMessage, Field, Formik } from "formik";
import { useTheme } from "@/components/theme/ThemeProvider";

const DealEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // ✅ fetch deal, clients, products, and stages
  const { data: deal, isLoading, isError } = useGetDealByDealId(id!);
  const { data: stages } = useGetStage();
  const { data: clients } = useGetClient();
  const { data: products } = useGetProduct();

  const updateDealMutation = useUpdateDeal();

  // Local state for editing
  const [formData, setFormData] = useState({
    clientId: "",
    productId: "",
    stage: "",
  });

  // populate form once deal is fetched
  useEffect(() => {
    if (deal) {
      setFormData({
        clientId: deal.clientId || "",
        productId: deal.productId || "",
        stage: deal.stage || "",
      });
    }
  }, [deal]);

  if (isLoading) return <p className="p-6">Loading deal...</p>;
  if (isError || !deal) return <p className="p-6 text-red-500">Deal not found.</p>;

  // ✅ theme-based select style
  const selectClasses = `w-full px-3 py-2 rounded-lg border outline-none transition-colors
    ${
      theme === "dark"
        ? "bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800"
        : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
    }`;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Deal</h2>
      <Formik
        initialValues={formData}
        enableReinitialize
        onSubmit={(values) => {
          updateDealMutation.mutate(
            { dealId: id!, deal: values },
            {
              onSuccess: () => {
                toast.success("Deal updated successfully!");
                navigate("/deals");
              },
            }
          );
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ✅ Client select */}
            <div>
              <label className="block text-sm font-medium mb-1">Client</label>
              <Field as="select" name="clientId" className={selectClasses}>
                <option value="">-- Select a client --</option>
                {clients?.map((c: any) => (
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

            {/* ✅ Product select */}
            <div>
              <label className="block text-sm font-medium mb-1">Product</label>
              <Field as="select" name="productId" className={selectClasses}>
                <option value="">-- Select a product --</option>
                {products?.map((p: any) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="productId"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* ✅ Stage select */}
            <div>
              <label className="block text-sm font-medium mb-1">Stage</label>
              <Field as="select" name="stage" className={selectClasses}>
                <option value="">-- Select a stage --</option>
                {stages?.map((s: any) => (
                  <option key={s.id} value={s.name}>
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

            <Button type="submit" disabled={updateDealMutation.isPending}>
              {updateDealMutation.isPending ? "Updating..." : "Update Deal"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default DealEdit;
