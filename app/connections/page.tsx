"use client";
import { Box, Grid, Heading, Text } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const ServiceAccessPage = () => {
  const { data: session, status: loading } = useSession();
  const router = useRouter();

  // Redirect to sign-in page if no session is detected
  if (loading === "loading" || !session) {
    router.push("/api/auth/signin");
    return null;
  }

  // Define the services and their descriptions
  const services = [
    {
      name: "Google Drive",
      description: "Store and share files in the cloud",
      logo: "/images/google_drive.png",  
       authProvider: "google",
      scopes: "https://www.googleapis.com/auth/drive", // Add this line
    },
    {
      name: "Facebook",
      description: "Connect with friends and family",
      logo: "/images/facebook-logo.png", // Update the path
    },
    {
      name: "Klaviyo",
      description: "Email marketing and automation platform",
      logo: "/images/klaviyo-logo.png", // Update the path
    },
    {
      name: "Shopify",
      description: "E-commerce platform for online stores",
      logo: "/images/shopify-logo.png", // Update the path
    },
  ];

  return (
    <Grid columns="4" gap="3">
      {services.map((service) => (
        <Box
        key={service.name}
        onClick={() =>
          signIn(service.authProvider, {
            authorizationParams: { scope: service.scopes }, // Add this line
          })
        }
      >
          <img src={service.logo} alt={service.name} />
          <Heading>{service.name}</Heading>
          <Text>{service.description}</Text>
        </Box>
      ))}
    </Grid>
  );
};
export default ServiceAccessPage;