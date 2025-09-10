import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, getStageColor } from "@/utils/helpers";
import {
  useDeleteDeal,
  useGetDealByDealId,
  useGetClient,
  useGetProduct,
} from "@/lib/query";

export const DealView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: deal, isLoading, isError } = useGetDealByDealId(id!);
  const deleteDealMutation = useDeleteDeal();

  const { data: clients } = useGetClient();
  const { data: products } = useGetProduct();

  const client = clients?.find((c: any) => c.id === deal?.clientId);
  const product = products?.find((p: any) => Number(p.id) === Number(deal?.productId));

  if (isLoading) {
    return (
      <p className="p-6 text-center text-muted-foreground">
        Loading deal...
      </p>
    );
  }

  if (isError || !deal) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Deal Not Found
        </h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          The deal you're looking for doesn’t exist or may have been removed.
        </p>
        <Button asChild>
          <Link to="/deals">Back to Deals</Link>
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this deal? This action cannot be undone."
      )
    ) {
      deleteDealMutation.mutate(deal.id, {
        onSuccess: () => navigate("/deals"),
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Back + Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div>
            <h1 className="text-2xl sm:text-2xl font-bold text-foreground">
              Deal Details
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Created {deal.createdDate ? formatDate(deal.createdDate) : "N/A"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <Button variant="outline" asChild>
            <Link to={`/deals/${deal.id}/edit`} className="flex items-center">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Deal Overview */}
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex flex-wrap items-center justify-between gap-2">
            <span className="mb-3">Deal Overview</span>
            <Badge className={`${getStageColor(deal.stage)} max-sm:mb-3 px-3 py-1 text-sm`}>
              {deal.stage}
            </Badge>
          </CardTitle>
          <CardDescription className="text-sm">
            Deal ID: {deal.id}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Client */}
          <div className="flex items-start space-x-3 mt-4 max-sm:mt-0">
            <User className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Client</p>
              <p className="text-sm text-muted-foreground">
                {client?.name || "Unknown Client"}
              </p>
            </div>
          </div>

          {/* Product */}
          <div className="flex items-start space-x-3 mt-4 max-sm:mt-0">
            <Package className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Product</p>
              <p className="text-sm text-muted-foreground">
                {product?.name || "Unknown Product"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
