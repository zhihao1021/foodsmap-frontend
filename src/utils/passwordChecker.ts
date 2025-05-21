export default function passwordChecker(password: string): boolean {
    const reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[^A-Za-z0-9]).{8,}$/);
    return reg.test(password);
}