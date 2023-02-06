export const DonutComparison = (get_customized_donut_array, confirm_order) => {
  var item_data = null;

  if (get_customized_donut_array?.length > 0) {
    for (const item of get_customized_donut_array) {
      if (
        confirm_order?.glaze?.length > 0 &&
        confirm_order?.sauce?.length > 0 &&
        confirm_order?.filling?.length > 0 &&
        confirm_order?.topping?.length > 0
      ) {
        if (
          (confirm_order?.glaze?.length > 0
            ? item.glaze?.length > 0 &&
            item.glaze[0]["name"] == confirm_order?.glaze[0]["name"]
            : false) &&
          (confirm_order?.sauce?.length > 0
            ? item.sauce?.length > 0 &&
            item.sauce[0]["name"] == confirm_order?.sauce[0]["name"]
            : false) &&
          (confirm_order?.filling?.length > 0
            ? item?.filling?.length > 0 &&
            item.filling[0]["name"] == confirm_order?.filling[0]["name"]
            : false) &&
          confirm_order?.topping?.length == item.topping?.length
        ) {

          if (confirm_order?.topping?.length > 0 && item.topping?.length > 0) {
            if (item.topping?.length == confirm_order.topping?.length) {
              if (
                item.topping.filter((item2, index) =>
                  confirm_order?.topping.find(
                    (confirm_order_topping) =>
                      confirm_order_topping.name == item2.name
                  )
                ).length == confirm_order.topping.length
              ) {
                const item_topping_filter = item.topping.filter(
                  (item2, index) =>
                    confirm_order?.topping.find(
                      (confirm_order_topping) =>
                        confirm_order_topping.name == item2.name
                    )
                );
                if (item_topping_filter.length > 0) {
                  if (item_topping_filter.length == item.topping.length) {
                    if (
                      confirm_order.topping.length == item_topping_filter.length
                    ) {
                      item_data = item;
                      break;
                    } else {
                      return item_data;
                    }
                  } else {
                    return item_data;
                  }
                } else {
                  return item_data;
                }
              } else {
                continue;
              }
            } else {
              continue;
            }
          } else {
            continue;
          }
        }
      }
      // GLAZES ----------  SAUCES ---------- FILLINGS
      else if (
        confirm_order?.topping?.length == 0 &&
        (confirm_order?.glaze?.length > 0
          ? item.glaze?.length > 0 &&
          item.glaze[0]["name"] == confirm_order?.glaze[0]["name"]
          : false) &&
        (confirm_order?.sauce?.length > 0
          ? item.sauce?.length > 0 &&
          item.sauce[0]["name"] == confirm_order?.sauce[0]["name"]
          : false) &&
        (confirm_order?.filling?.length > 0
          ? item?.filling.length > 0 &&
          item.filling[0]["name"] == confirm_order?.filling[0]["name"]
          : item.filling?.length == confirm_order?.filling?.length)
      ) {
        if (item?.topping?.length == 0) {
          item_data = item;
          break;
        }
      }
      // GLAZES ----------  SAUCES ----------- TOPPINGS
      else if (
        confirm_order?.filling?.length == 0 &&
        (confirm_order?.glaze?.length > 0
          ? item.glaze?.length > 0 &&
          item.glaze[0]["name"] == confirm_order?.glaze[0]["name"]
          : false) &&
        (confirm_order?.sauce?.length > 0
          ? item.sauce?.length > 0 &&
          item.sauce[0]["name"] == confirm_order?.sauce[0]["name"]
          : false) &&
        confirm_order?.topping?.length > 0 &&
        item?.topping?.length > 0 &&
        (item.topping.filter((item2, index) =>
          confirm_order?.topping.find(
            (confirm_order_topping) => confirm_order_topping.name == item2.name
          )
        )?.length ==
          item.topping?.length) ==
        (confirm_order?.topping.length ==
          item.topping.filter((item2, index) =>
            confirm_order?.topping.find(
              (confirm_order_topping) =>
                confirm_order_topping.name == item2.name
            )
          )?.length)
      ) {
        if (item?.filling?.length == 0) {
          item_data = item;
          break;
        }
      }
      // GLAZES  ---------- FILLINGS ----------- TOPPINGS
      else if (
        confirm_order?.sauce?.length == 0 &&
        (confirm_order?.glaze?.length > 0
          ? item.glaze?.length > 0 &&
          item.glaze[0]["name"] == confirm_order?.glaze[0]["name"]
          : false) &&
        (confirm_order?.filling?.length > 0
          ? item?.filling.length > 0 &&
          item.filling[0]["name"] == confirm_order?.filling[0]["name"]
          : false) &&
        confirm_order?.topping?.length > 0 &&
        item?.topping?.length > 0 &&
        (item.topping.filter((item2, index) =>
          confirm_order?.topping.find(
            (confirm_order_topping) => confirm_order_topping.name == item2.name
          )
        )?.length ==
          item.topping?.length) ==
        (confirm_order?.topping.length ==
          item.topping.filter((item2, index) =>
            confirm_order?.topping.find(
              (confirm_order_topping) =>
                confirm_order_topping.name == item2.name
            )
          )?.length)
      ) {
        if (item?.sauce?.length == 0) {
          item_data = item;
          break;
        }
      }
      // FILLINGS ---------- SAUCES ----------- TOPPINGS
      else if (
        confirm_order?.glazes?.length == 0 &&
        (confirm_order?.filling?.length > 0
          ? item.filling[0]["name"] == confirm_order?.filling[0]["name"]
          : false) &&
        (confirm_order?.sauce?.length > 0
          ? item.sauce?.length > 0 &&
          item.sauce[0]["name"] == confirm_order?.sauce[0]["name"]
          : false) &&
        confirm_order?.topping?.length > 0 &&
        item?.topping?.length > 0 &&
        (item.topping.filter((item2, index) =>
          confirm_order?.topping.find(
            (confirm_order_topping) => confirm_order_topping.name == item2.name
          )
        )?.length ==
          item.topping?.length) ==
        (confirm_order?.topping.length ==
          item.topping.filter((item2, index) =>
            confirm_order?.topping.find(
              (confirm_order_topping) =>
                confirm_order_topping.name == item2.name
            )
          )?.length)
      ) {
        if (item?.glazes?.length == 0) {
          item_data = item;
          break;
        }
      }
      // GLAZES ------------  SAUCES
      else if (
        confirm_order?.filling?.length == 0 &&
        confirm_order?.topping?.length == 0 &&
        (confirm_order?.glaze?.length > 0
          ? item.glaze?.length > 0 &&
          item.glaze[0]["name"] == confirm_order?.glaze[0]["name"]
          : false) &&
        (confirm_order?.sauce?.length > 0
          ? item.sauce?.length > 0 &&
          item?.sauce[0]["name"] == confirm_order?.sauce[0]["name"]
          : false)
      ) {
        if (item?.filling?.length == 0 && item?.topping?.length == 0) {
          item_data = item;
          break;
        }
      }
      // GLAZES ------------  FILLINGS
      else if (
        confirm_order?.sauce?.length == 0 &&
        confirm_order?.topping?.length == 0 &&
        (confirm_order?.glaze?.length > 0
          ? item.glaze?.length > 0 &&
          item?.glaze[0]["name"] == confirm_order?.glaze[0]["name"]
          : false) &&
        (confirm_order?.filling?.length > 0
          ? item.filling?.length > 0 &&
          item?.filling[0]["name"] == confirm_order?.filling[0]["name"]
          : false)
      ) {
        if (item?.sauce.length == 0 && item?.topping?.length == 0) {
          item_data = item;
          break;
        }
      }
      // GLAZES ------------  TOPPINGS
      else if (
        confirm_order?.sauce?.length == 0 &&
        confirm_order?.filling?.length == 0 &&
        (confirm_order?.glaze?.length > 0
          ? item.glaze?.length > 0 &&
          item.glaze[0]["name"] == confirm_order?.glaze[0]["name"]
          : false) &&
        confirm_order?.topping?.length > 0 &&
        item?.topping?.length > 0 &&
        (item.topping.filter((item2, index) =>
          confirm_order?.topping.find(
            (confirm_order_topping) => confirm_order_topping.name == item2.name
          )
        )?.length ==
          item.topping?.length) ==
        (confirm_order?.topping.length ==
          item.topping.filter((item2, index) =>
            confirm_order?.topping.find(
              (confirm_order_topping) =>
                confirm_order_topping.name == item2.name
            )
          )?.length)
      ) {
        if (item?.sauce.length == 0 && item?.filling?.length == 0) {
          item_data = item;
          break;
        }
      }
      // FILLINGS ----------- SAUCES
      else if (
        confirm_order?.glaze?.length == 0 &&
        confirm_order?.topping?.length == 0 &&
        (confirm_order?.filling?.length > 0
          ? item.filling[0]["name"] == confirm_order?.filling[0]["name"]
          : false) &&
        (confirm_order?.sauce?.length > 0
          ? item.sauce?.length > 0 &&
          item.sauce[0]["name"] == confirm_order?.sauce[0]["name"]
          : false)
      ) {
        if (item?.glaze.length == 0 && item?.topping?.length == 0) {
          item_data = item;
          break;
        }
      }
      // FILLINGS ----------- TOPPINGS
      else if (
        confirm_order?.glaze?.length == 0 &&
        confirm_order?.sauce?.length == 0 &&
        (confirm_order?.filling?.length > 0
          ? item.filling[0]["name"] == confirm_order?.filling[0]["name"]
          : false) &&
        confirm_order?.topping?.length > 0 &&
        item?.topping?.length > 0 &&
        (item.topping.filter((item2, index) =>
          confirm_order?.topping.find(
            (confirm_order_topping) => confirm_order_topping.name == item2.name
          )
        )?.length ==
          item.topping?.length) ==
        (confirm_order?.topping.length ==
          item.topping.filter((item2, index) =>
            confirm_order?.topping.find(
              (confirm_order_topping) =>
                confirm_order_topping.name == item2.name
            )
          )?.length)
      ) {
        if (item?.sauce.length == 0 && item?.glaze?.length == 0) {
          item_data = item;
          break;
        }
      }
      // SAUCES  ------------ TOPPINGS
      else if (
        confirm_order?.glaze?.length == 0 &&
        confirm_order?.filling?.length == 0 &&
        (confirm_order?.sauce?.length > 0
          ? item.sauce?.length > 0 &&
          item.sauce[0]["name"] == confirm_order?.sauce[0]["name"]
          : false) &&
        confirm_order?.topping?.length > 0 &&
        item?.topping?.length > 0 &&
        (item.topping.filter((item2, index) =>
          confirm_order?.topping.find(
            (confirm_order_topping) => confirm_order_topping.name == item2.name
          )
        )?.length ==
          item.topping?.length) ==
        (confirm_order?.topping.length ==
          item.topping.filter((item2, index) =>
            confirm_order?.topping.find(
              (confirm_order_topping) =>
                confirm_order_topping.name == item2.name
            )
          )?.length)
      ) {
        if (item?.glaze.length == 0 && item?.filling?.length == 0) {
          item_data = item;
          break;
        }
      }
      // GLAZES
      else if (
        confirm_order?.sauce?.length == 0 &&
        confirm_order?.topping?.length == 0 &&
        confirm_order?.filling?.length == 0 &&
        confirm_order?.glaze?.length > 0 &&
        item.glaze?.length > 0 &&
        item?.glaze[0]["name"] == confirm_order?.glaze[0]["name"] &&
        item.sauce?.length == 0 &&
        item.filling?.length == 0 &&
        item.topping?.length == 0
      ) {
        item_data = item;
        break;
      }
      // SAUCES
      else if (
        confirm_order?.glaze?.length == 0 &&
        confirm_order?.topping?.length == 0 &&
        confirm_order?.filling?.length == 0 &&
        confirm_order?.sauce?.length > 0 &&
        item.sauce?.length > 0 &&
        item.sauce[0]["name"] == confirm_order?.sauce[0]["name"] &&
        item.glaze.length == 0 &&
        item.filling?.length == 0 &&
        item.topping?.length == 0
      ) {
        item_data = item;
        break;
      }
      // FILLINGS
      else if (
        confirm_order?.sauce?.length == 0 &&
        confirm_order?.topping?.length == 0 &&
        confirm_order?.glaze?.length == 0 &&
        confirm_order?.filling?.length > 0 &&
        item.filling[0]["name"] == confirm_order?.filling[0]["name"] &&
        item.sauce?.length == 0 &&
        item.glaze?.length == 0 &&
        item.topping?.length == 0
      ) {
        item_data = item;
        break;
      }
      // TOPPINGS
      else if (
        confirm_order?.sauce?.length == 0 &&
        confirm_order?.glaze?.length == 0 &&
        confirm_order?.filling?.length == 0 &&
        confirm_order?.topping?.length > 0 &&
        (item.topping.filter(
          (item2, index) =>
            confirm_order?.topping.find(
              (confirm_order_topping) =>
                confirm_order_topping.name == item2.name
            )
        )?.length ==
          item.topping?.length) ==
        (confirm_order?.topping.length ==
          item.topping.filter((item2, index) =>
            confirm_order?.topping.find(
              (confirm_order_topping) =>
                confirm_order_topping.name == item2.name
            )
          )?.length) &&
        item.sauce?.length == 0 &&
        item.filling?.length == 0 &&
        item.glaze?.length == 0
      ) {
        item_data = item;
        break;
      } else {
        item_data = null;
      }
    }
    return item_data;
  }
};
