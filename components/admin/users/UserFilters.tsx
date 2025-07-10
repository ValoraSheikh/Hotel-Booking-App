import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface UserFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  providerFilter: string;
  setProviderFilter: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export const UserFilters = ({
  searchTerm,
  setSearchTerm,
  providerFilter,
  setProviderFilter,
  setCurrentPage,
}: UserFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10"
        />
      </div>
      <Select
        value={providerFilter}
        onValueChange={(value) => {
          setProviderFilter(value);
          setCurrentPage(1);
        }}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by provider" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Providers</SelectItem>
          <SelectItem value="google">Google</SelectItem>
          <SelectItem value="credentials">Credentials</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};