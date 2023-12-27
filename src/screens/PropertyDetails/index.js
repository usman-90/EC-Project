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
           listingOwner={item?.contactDetails?.ListingOwner}
        contactPerson={item?.contactDetails?.contactPerson}
        email={item?.contactDetails?.email}
        phone={item?.contactDetails?.phone}
        location={item?.locationAndAddress}
        status={item?.typesAndPurpose?.purpose}
      //  parkingSpace={property1?.number_of_garage}
        bedrooms={
          item?.amenities?.filter(
            (item) => item.name == "bedRooms"
          )[0].value
        }
        bathrooms={
          item?.amenities?.filter(
            (item) => item.name == "bathRooms"
          )[0].value
        }
        // garage={property1?.number_of_garage}
        area={item?.propertyDetails?.areaSquare}
        category={item?.typesAndPurpose?.category}
        aracbiDescription={item?.propertyDetails?.descriptionArabic}
    />
  );
};
export default PropertyDetailWrapper;
