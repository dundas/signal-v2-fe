import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { listShops } from "@/app/utils/actions/shop/listShops"
import AddManifestModal from "@/components/Manifest/AddManifestModal"
async function ShopList() {

  const shopList = await listShops()
  console.log(shopList)
  return (
    <Table>
      <TableCaption>Active Shops.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Shop Name</TableHead>
          <TableHead></TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {shopList.map((shop) => (
          <TableRow key={shop._id}>
            <TableCell className="font-medium">{shop.shop}</TableCell>
            <TableCell>
              <AddManifestModal shop={shop} />
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default ShopList