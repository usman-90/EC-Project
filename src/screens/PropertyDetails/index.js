import PropertyDetails from "../../components/PropertyDetails";

const PropertyDetailWrapper = ({ route, navigation }) => {
  const { item } = route?.params;

  console.log(item?.propertyDetails?.InclusivePrice);
  return (
    <PropertyDetails
      title={item?.propertyDetails?.title}
      images={item?.upload?.images}
      price={item?.propertyDetails?.InclusivePrice}
      location={item?.locationAndAddress}
      bedrooms={
        item?.amenities?.filter((item) => item.name == "bedRooms")[0].value
      }
      text={item?.propertyDetails?.description ?? ""}
      features={item?.amenities}
      listingOwner={item?.contactDetails?.ListingOwner}
      contactPerson={item?.contactDetails?.contactPerson}
      email={item?.contactDetails?.email}
      phone={item?.contactDetails?.phone}
      status={item?.typesAndPurpose?.purpose}
      //  parkingSpace={property1?.number_of_garage}
      bathrooms={
        item?.amenities?.filter((item) => item.name == "bathRooms")[0].value
      }
      // garage={property1?.number_of_garage}
      area={item?.propertyDetails?.areaSquare}
      category={item?.typesAndPurpose?.category}
      aracbiDescription={item?.propertyDetails?.descriptionArabic}
      navigateBack={navigation.goBack}
    />
  );
};
export default PropertyDetailWrapper;
