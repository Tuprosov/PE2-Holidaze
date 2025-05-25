import { useUserStore } from "../../js/store/userStore";
import Dashboard from "./Dashboard";

export default function Main() {
  const { user } = useUserStore();
  return (
    <main className="px-6">
      <div className="flex flex-col items-center mb-7">
        <h1 className="text-4xl font-bold mb-4">Welcome {user.name}</h1>
        <p className="text-lg text-gray-700">
          Here you can manage your listings, messages, and more.
        </p>
      </div>
      <section>
        <h2 className="mb-6">Reservations</h2>
        <Dashboard />
      </section>
      <section>
        <h2>Some section title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          ullamcorper, nunc et bibendum facilisis, nunc nisi aliquet nunc, eget
          aliquam nunc nisi euismod nunc.
        </p>
      </section>
      <section>
        <h2>Some section title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          ullamcorper, nunc et bibendum facilisis, nunc nisi aliquet nunc, eget
          aliquam nunc nisi euismod nunc.
        </p>
      </section>
    </main>
  );
}
