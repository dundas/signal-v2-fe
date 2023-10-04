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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

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
            <TableCell>Manifest</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default ShopList