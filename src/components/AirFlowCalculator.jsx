import { useState } from "react";
import Card from "./Card";
import { computeAirflow } from "../utils/calculateAirflow";

export default function AirflowCalculator() {
  const [form, setForm] = useState({ length: 5, width: 4, height: 2.6, targetACH: 5 });
  const r = computeAirflow(form);

  return (
    <Card title="Airflow & Purification Time" subtitle="Estimate airflow (CFM) and time to reach target clean air cycles">
      <div className="grid md:grid-cols-4 gap-3 mb-4">
        {[
          { k:"length", label:"Length (m)"},
          { k:"width", label:"Width (m)"},
          { k:"height", label:"Height (m)"},
          { k:"targetACH", label:"Target ACH"},
        ].map((f)=>(
          <div key={f.k}>
            <label className="block text-xs text-gray-600 mb-1">{f.label}</label>
            <input
              type="number"
              value={form[f.k]}
              onChange={(e)=>setForm({...form,[f.k]: Number(e.target.value)})}
              className="w-full rounded-lg border px-3 py-2"
              step="0.1"
            />
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border p-4">
          <div className="text-xs text-gray-500">Floor Area</div>
          <div className="text-xl font-semibold">{r.area.toFixed(2)} m²</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-xs text-gray-500">Required Airflow</div>
          <div className="text-xl font-semibold">{Math.round(r.requiredCFM)} CFM</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-xs text-gray-500">Est. Purification Time</div>
          <div className="text-xl font-semibold">{r.estimatedMinutes.toFixed(0)} min</div>
        </div>
      </div>
    </Card>
  );
}
