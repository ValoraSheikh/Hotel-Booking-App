import { Search, Hotel } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  searchQuery?: string;
}

export const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  if (searchQuery) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-muted p-3">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No rooms found
          </h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            No rooms match your search for &quot;{searchQuery}&quot;. Try adjusting your search terms.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Clear Search
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-muted p-3">
          <Hotel className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No rooms yet
        </h3>
        <p className="text-muted-foreground mb-4 max-w-sm">
          Get started by adding your first hotel room to the inventory.
        </p>
        <Button>
          Add Your First Room
        </Button>
      </CardContent>
    </Card>
  );
};