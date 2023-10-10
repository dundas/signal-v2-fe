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
import { Button } from "@/components/ui/button"
import Link from 'next/link'

async function ShopList() {
  const shopList = await listShops()

  return (
    <Table>
      <TableCaption>Active Shops.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >Shop Name</TableHead>
          <TableHead>Manifest</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shopList.map((shop) => (
          <TableRow key={shop.shop._id}>
            <TableCell className="font-medium">{shop.shop.shop}</TableCell>
            <TableCell>
              {shop.shopManifest ? (
                <Button>
                  <Link href={`/manifest/${shop.shopManifest._id}`}>
                    Edit Manifest
                  </Link>
                </Button>
              ) : (
                <AddManifestModal shop={shop.shop} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default ShopList