"use client";

import { useMemo, useState } from "react";
import { X, Plus, Minus } from "lucide-react";

export default function ProductCustomizationModal({
  product,
  onClose,
  onAddToCart,
}) {
  const groups = product.modifierGroups || [];

  const [selections, setSelections] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Calculate customized price
  const selectedOptions = useMemo(() => {
    return groups.flatMap((group) => {
      const selected = selections[group.id];

      if (!selected) return [];

      const selectedIds = Array.isArray(selected) ? selected : [selected];

      return group.options
        .filter((option) => selectedIds.includes(option.id))
        .map((option) => ({
          groupId: group.id,
          groupName: group.name,
          optionId: option.id,
          optionName: option.name,
          priceDelta: option.priceDelta || 0,
        }));
    });
  }, [groups, selections]);

  const unitPrice =
    (product.basePrice ?? product.price ?? 0) +
    selectedOptions.reduce((total, option) => total + option.priceDelta, 0);

  const totalPrice = unitPrice * quantity;

  // Check required selections
  const missingRequired = groups.some((group) => {
    if (!group.required) return false;

    const selected = selections[group.id];

    return !selected || (Array.isArray(selected) && selected.length === 0);
  });

  // Handle option selection
  function handleSelection(group, option) {
    setSelections((previous) => {
      const current = previous[group.id];

      if (group.selectionType === "multiple") {
        const selected = Array.isArray(current) ? current : [];

        const exists = selected.includes(option.id);

        if (exists) {
          return {
            ...previous,
            [group.id]: selected.filter((id) => id !== option.id),
          };
        }

        if (group.maxSelections && selected.length >= group.maxSelections) {
          return previous;
        }

        return {
          ...previous,
          [group.id]: [...selected, option.id],
        };
      }

      return {
        ...previous,
        [group.id]: option.id,
      };
    });
  }

  function handleAddToCart() {
    if (missingRequired) return;

    onAddToCart?.({
      productId: product.id,
      name: product.name,
      image: product.image,
      quantity,
      basePrice: product.basePrice ?? product.price ?? 0,
      selectedModifiers: selectedOptions,
      unitPrice: Number(unitPrice.toFixed(2)),
      totalPrice: Number(totalPrice.toFixed(2)),
    });

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="customization-title"
        className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
          <h2 id="customization-title" className="serif text-2xl font-bold">
            Customize {product.name}
          </h2>

          <button
            onClick={onClose}
            className="rounded-full bg-stone-100 p-2"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product */}
        <div className="p-4">
          <div className="flex gap-4">
            <img
              src={product.image}
              alt={product.alt || product.name}
              className="h-24 w-24 rounded-xl object-cover"
            />

            <div>
              <h3 className="font-semibold">{product.name}</h3>

              <p className="mt-1 text-sm text-stone-500">{product.desc}</p>

              <p className="mt-2 font-semibold">
                From ${(product.basePrice ?? product.price ?? 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Modifier Groups */}
        <div className="space-y-6 px-4 pb-6">
          {groups.map((group) => (
            <section key={group.id}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">{group.name}</h3>

                <span className="text-xs text-stone-500">
                  {group.required ? "Required" : "Optional"}
                </span>
              </div>

              <div className="space-y-2">
                {group.options.map((option) => {
                  const current = selections[group.id];

                  const isSelected = Array.isArray(current)
                    ? current.includes(option.id)
                    : current === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelection(group, option)}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                        isSelected
                          ? "border-stone-900 bg-stone-50"
                          : "border-stone-200"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 items-center justify-center border ${
                            group.selectionType === "multiple"
                              ? "rounded"
                              : "rounded-full"
                          } ${
                            isSelected
                              ? "border-stone-900 bg-stone-900"
                              : "border-stone-300"
                          }`}
                        >
                          {isSelected && (
                            <span className="text-xs text-white">✓</span>
                          )}
                        </span>

                        <span>{option.name}</span>
                      </span>

                      <span className="text-sm text-stone-500">
                        {option.priceDelta > 0
                          ? `+$${option.priceDelta.toFixed(2)}`
                          : "Included"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-between border-t px-4 py-4">
          <span className="font-semibold">Quantity</span>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="rounded-full bg-stone-100 p-2"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>

            <span className="font-semibold">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="rounded-full bg-stone-100 p-2"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Add to cart */}
        <div className="sticky bottom-0 border-t bg-white p-4">
          <button
            disabled={missingRequired}
            onClick={handleAddToCart}
            className="flex w-full items-center justify-between rounded-xl bg-stone-900 px-5 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Add to order</span>
            <span>${totalPrice.toFixed(2)}</span>
          </button>

          {missingRequired && (
            <p className="mt-2 text-center text-xs text-red-500">
              Please complete all required selections.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
