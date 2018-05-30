function superCompress(input) {
  return readFromCache(input)
    .then(
      result => cleanCacheMetadata(result),
      error => {
        if (error.code != 'NoCache') {
           return Promise.reject(error);
        }
        
        return readFromFile(input)
        .then(result => {
          return storeInCache(input, result)
            .then(() => result);
        });
      }
    )
    .then(content => compress(content));
}
