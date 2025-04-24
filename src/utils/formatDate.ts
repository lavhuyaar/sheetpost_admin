const formatDate = (dateString: string) => {
  const date: string = new Date(dateString).toLocaleDateString();
  return date;
};

export default formatDate;
