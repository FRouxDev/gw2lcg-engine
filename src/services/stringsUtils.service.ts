class StringsUtilsService {
  capitalize(str: string): string {
    const [first, ...rest] = str;
    return `${first.toUpperCase()}${rest.join('')}`;
  }
}

export default new StringsUtilsService();
