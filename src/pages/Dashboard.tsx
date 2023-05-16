import { useEffect, useState } from "react";

interface IClientData {
  name: string;
  health: number;
  armour: number;
  money: number;
}

const Dashboard = () => {
  const [name, setName] = useState<string>("unknown");
  const [health, setHealth] = useState<number>(-1);
  const [armour, setArmour] = useState<number>(-1);
  const [money, setMoney] = useState<number>(-1);

  useEffect(() => {
    window.EventManager.addHandler(
      "cef.dashboard",
      (clientData: IClientData[]) => {
        const [{ name, health, armour, money }] = clientData;

        setName(name);
        setHealth(health);
        setArmour(armour);
        setMoney(money);
      }
    );

    return () => {
      window.EventManager.removeHandler("cef.dashboard", () => {
        setName("deleted");
        setHealth(-2);
        setArmour(-2);
        setMoney(-2);
      });
    };
  }, []);

  return (
    <div className="p-4 flex flex-col gap-2 border-b-4 border-orange-500 text-gray-100 bg-black/60">
      <h1 className="border-b-2 border-orange-500 font-semibold text-center">
        Dashboard
      </h1>
      <div className="flex flex-col">
        <DashboardOption option="Name" value={name} />
        <DashboardOption option="Health" value={health} />
        <DashboardOption option="Armour" value={armour} />
        <DashboardOption option="Money" value={money} />
      </div>
    </div>
  );
};

const DashboardOption = ({ option, value }: { option: string; value: any }) => {
  return (
    <div className="flex justify-between gap-40">
      <p className="font-semibold">{option}:</p>
      <p>{value}</p>
    </div>
  );
};

export default Dashboard;
