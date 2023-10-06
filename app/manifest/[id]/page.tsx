"use server";
import EditManifest from "@/components/Manifest/EditManifest"

const ServerParamsPage = ({ params }: { params: { id: string } }) => {

    
  return (
    <EditManifest manifestId={id} /> 
  );
};

export default ServerParamsPage;