import PropertyDetails from "../../components/PropertyDetails";

const PropertyDetailWrapper = ({ route }) => {
  const { item } = route?.params;

  console.log(item?.propertyDetails?.InclusivePrice);
  return (
    <PropertyDetails
      title={item?.propertyDetails?.title}
      text={item?.propertyDetails?.description ?? ""}
      price={item?.propertyDetails?.InclusivePrice}
      images={item?.upload?.images}
      features={item?.amenities}
    />
  );
};
export default PropertyDetailWrapper;
