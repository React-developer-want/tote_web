function replaceIdWithKey(obj) {
  const stack = [{ data: obj }];
  while (stack.length > 0) {
    const currentItem = stack.pop();
    const { data } = currentItem;

    if (data instanceof Array) {
      currentItem.replaced = data.map((item) => {
        if (item instanceof Object) {
          const newObj = {};
          Object.keys(item).forEach((key) => {
            const newKey = key === '_id' ? 'id' : key;
            newObj[newKey] = item[key];
          });
          return newObj;
        }
        return item;
      });
    } else if (data instanceof Object) {
      Object.keys(data).forEach((key) => {
        if (data[key] instanceof Array || data[key] instanceof Object) {
          stack.push({ data: data[key] });
        }
      });

      data.id = data._id;
      delete data._id;
    }
  }
  return obj;
}

module.exports = { replaceIdWithKey };
