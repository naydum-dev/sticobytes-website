import Badge from "../common/Badge";
import Button from "../common/Button";
import {
  createWhatsAppLink,
  formatPrice,
  getStockBadgeVariant,
  getStockLabel,
} from "../../services/gadgetApi";

// WhatsApp Icon Component
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const GadgetCard = ({
  id,
  name,
  description,
  price,
  image,
  category,
  stock_status,
  whatsapp_message,
  is_featured,
}) => {
  const handleWhatsAppClick = () => {
    const link = createWhatsAppLink(name, whatsapp_message);
    window.open(link, "_blank");
  };

  const isOutOfStock = stock_status === "out_of_stock";

  return (
    <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group h-full flex flex-col">
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {/* Featured Badge */}
        {is_featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="primarySolid" size="sm">
              Featured
            </Badge>
          </div>
        )}

        {/* Stock Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge variant={getStockBadgeVariant(stock_status)} size="sm">
            {getStockLabel(stock_status)}
          </Badge>
        </div>

        {/* Image Placeholder with Icon */}
        <div className="w-full h-full flex items-center justify-center">
          {image === "placeholder" ? (
            <div className="text-primary-600 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-32 h-32"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
          ) : (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Details */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Category */}
        <div className="mb-2">
          <Badge variant="default" size="sm">
            {category}
          </Badge>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-heading font-bold text-navy-900 mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <p className="text-3xl font-bold text-primary-600">
            {formatPrice(price)}
          </p>
        </div>

        {/* WhatsApp Button */}
        <Button
          variant={isOutOfStock ? "outline" : "primary"}
          size="lg"
          fullWidth
          onClick={handleWhatsAppClick}
          icon={WhatsAppIcon}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Notify When Available" : "Inquire on WhatsApp"}
        </Button>
      </div>
    </div>
  );
};
