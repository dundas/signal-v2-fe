"use server";
import EditManifest from "@/components/Manifest/EditManifest"
import { getShopManifest } from "@/app/utils/actions/shop/getShopManifest";
import ShopManifest from "@/utils/db/mongoose/models/shopManifest";
import { connectDB } from "@/app/utils/db/mongoose/connect";
import Shop from "@/app/utils/db/mongoose/models/Shop";
const EditManifestPage = async ({ params }) => {

  const { id } = params;
  await connectDB()
  let manifestDetails = await ShopManifest.findOne({ _id: id })
  manifestDetails = JSON.parse(JSON.stringify(manifestDetails))

  // get shop deetails 
  let shopDetails = await Shop.findOne({ _id: manifestDetails.shopId })
  shopDetails = JSON.parse(JSON.stringify(shopDetails))

  return (
    <EditManifest manifest={manifestDetails} shop={shopDetails} />
  );
};

export default EditManifestPage;