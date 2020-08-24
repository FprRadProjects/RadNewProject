import { useState, useEffect } from 'react';
import { WorkActions_action } from "../../../_actions";

export default function SetToMark(peygir_id, FetchData, Params) {
    WorkActions_action.InsertIntoWorkMark(peygir_id).then(data => {
        if (data.status) {
            FetchData(Params);
        }
    });
}
